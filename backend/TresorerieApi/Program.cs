using TresorerieApi.Data;
using TresorerieApi.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Bind Render (8080) 
builder.WebHost.UseUrls("http://0.0.0.0:8080");

// = CORS =

var MyCors = "_myCors";
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyCors, policy =>
    {
        policy
            .WithOrigins("http://localhost:5173","https://trezly.vercel.app")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
    
});

//  database env var for Render is ConnectionStrings__DefaultConnection) 
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Services 
builder.Services.AddScoped<CategoriesService>();

//  MVC + Swagger 
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Swagger var env ENABLE_SWAGGER=true
var enableSwagger = app.Configuration.GetValue<bool>("ENABLE_SWAGGER");
if (app.Environment.IsDevelopment() || enableSwagger)
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Health check for Render
app.MapGet("/health", () => Results.Ok("OK"));

app.UseHttpsRedirection();
app.UseCors(MyCors);
app.UseAuthorization();
app.MapControllers();

// AUTO-MIGRATIONS AU DÉMARRAGE 
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

app.Run();
