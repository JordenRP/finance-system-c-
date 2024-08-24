FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

COPY Backend/FinanceManagementSystem.csproj Backend/
WORKDIR /src/Backend
RUN dotnet restore

COPY Backend/. .
RUN dotnet build -c Release -o /app/build --verbosity diagnostic

FROM build AS publish
RUN dotnet publish -c Release -o /app/publish --verbosity diagnostic

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FinanceManagementSystem.dll"]
