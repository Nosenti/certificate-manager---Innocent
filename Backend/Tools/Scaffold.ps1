$outputDir = "./Entities"
$contextDir = "./Data"

# Set the environment to Development
$env:ASPNETCORE_ENVIRONMENT = "Development"

dotnet ef dbcontext scaffold Name=ConnectionStrings:DefaultConnection Microsoft.EntityFrameworkCore.SqlServer `
  -o $outputDir --context-dir $contextDir --force