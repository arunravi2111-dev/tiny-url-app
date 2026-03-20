namespace TinyUrlApi.Models;

public class UrlItem
{
    public int Id { get; set; }
    public string OriginalUrl { get; set; } = string.Empty;
    public string ShortCode { get; set; } = string.Empty;
    public int Clicks { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public bool isPrivate { get; set; } = false;
}