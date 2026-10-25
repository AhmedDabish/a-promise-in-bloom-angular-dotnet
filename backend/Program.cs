using Microsoft.EntityFrameworkCore;
using WeddingInvitation.Api.Data;
using WeddingInvitation.Api.Models;
using WeddingInvitation.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<WeddingDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("WeddingDb") ?? "Data Source=wedding.db"));
builder.Services.AddScoped<IWeddingService, WeddingService>();
builder.Services.AddCors(options => options.AddPolicy("AngularClient", policy =>
    policy.WithOrigins("http://localhost:4200", "https://localhost:4200")
          .AllowAnyHeader().AllowAnyMethod()));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<WeddingDbContext>();
    db.Database.EnsureCreated();
    await SeedData.InitializeAsync(db);
}

// Swagger enabled always for easy testing & local runs
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Wedding Invitation API v1");
    c.RoutePrefix = "swagger";
});

app.UseCors("AngularClient");
app.MapControllers();

// Health check endpoint
app.MapGet("/health", () => Results.Ok(new { status = "healthy" }));

// Redirect root URL to swagger so / does not return 404
app.MapGet("/", () => Results.Redirect("/swagger"));

app.Run();
