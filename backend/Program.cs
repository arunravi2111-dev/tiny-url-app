using Microsoft.EntityFrameworkCore;
using TinyUrlApi.Data;
using TinyUrlApi.Models;

var builder = WebApplication.CreateBuilder(args);

// SQLite configuration
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=tinyurl.db"));

var corsOrigins = builder.Configuration
    .GetSection("Cors:AllowedOrigins")
    .Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("DynamicCorsPolicy", policy =>
    {
        policy
            .WithOrigins(corsOrigins!)
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("DynamicCorsPolicy");
app.UseSwagger();
app.UseSwaggerUI();

// Ensure DB created
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

#region Helper: Generate Short Code
string GenerateShortCode()
{
    const string chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var random = new Random();
    return new string(Enumerable.Repeat(chars, 6)
        .Select(s => s[random.Next(s.Length)]).ToArray());
}
#endregion

#region API Endpoints

// GET all URLs
app.MapGet("/api/url", async (AppDbContext db) =>
    await db.Urls.ToListAsync());

// GET by id
app.MapGet("/api/url/{id}", async (int id, AppDbContext db) =>
    await db.Urls.FindAsync(id) is UrlItem url ? Results.Ok(url) : Results.NotFound());

// CREATE short URL
app.MapPost("/api/url", async (UrlItem input, AppDbContext db) =>
{
    var shortCode = GenerateShortCode();

    var url = new UrlItem
    {
        OriginalUrl = input.OriginalUrl,
        ShortCode = shortCode
    };

    if (!input.isPrivate)
    {
        db.Urls.Add(url);
        await db.SaveChangesAsync();
    }

    return Results.Ok(url);
});

// DELETE URL
app.MapDelete("/api/url/{id}", async (int id, AppDbContext db) =>
{
    var url = await db.Urls.FindAsync(id);
    if (url == null) return Results.NotFound();

    db.Urls.Remove(url);
    await db.SaveChangesAsync();

    return Results.Ok();
});

// DELETE URL
app.MapDelete("/api/url/", async (AppDbContext db) =>
{

    var allUrls = db.Urls.ToList();

    db.Urls.RemoveRange(allUrls);
    await db.SaveChangesAsync();

    return Results.Ok();
});

// REDIRECT
app.MapGet("/{shortCode}", async (string shortCode, AppDbContext db) =>
{
    var url = await db.Urls.FirstOrDefaultAsync(x => x.ShortCode == shortCode);

    if (url == null)
        return Results.NotFound();

    url.Clicks++;
    await db.SaveChangesAsync();

    return Results.Redirect(url.OriginalUrl);
});

#endregion

app.Run();