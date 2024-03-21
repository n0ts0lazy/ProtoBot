@echo off
set website=discord.com
set delay_seconds=10

:pingLoop
echo Pinging %website%...
ping -n 1 %website% | find "TTL=" > nul

if errorlevel 1 (
    echo If no connection is found then this loop will run indefinitely till it establishes connection with %website%. Retrying in %delay_seconds% seconds...
    timeout /nobreak /t %delay_seconds%
    goto pingLoop
) else (
    echo Connection successful. Proceeding to launch Protobot
    node ./src/index.js
)

pause
