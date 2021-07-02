@echo off

set FLASK_APP=manager.py

setlocal EnableDelayedExpansion
set arg1=%1
set arg2=%2

if "%arg1%"=="init" (
    set data=F
    set key=T
    
    if "%arg2%"=="--all" set data=T
    if "%arg2%"=="--db" (
        set data=T
        set key=F
    )

    if "!key!"=="T" (
        pip install -r requirements.txt

        copy .env.example .env
        flask init key
    )

    if "%arg2%"=="--all" (
        flask init db
        flask init models
    )

    if "!data!"=="T" (
        flask db init
        flask db migrate
        flask db upgrade
    )
    
    set data=
    set key=

) else if "%arg1%"=="run" (
    if "%arg2%"=="--prod" (
        waitress-serve --port=5000 --url-scheme=https manager:app
    ) else (
        flask run -h 0.0.0.0 -p 5000
    )
)

if "%arg1%"=="update" (
    pip install -r requirements.txt
    flask db migrate
    flask db upgrade
)

set arg1=
set arg2=
endlocal