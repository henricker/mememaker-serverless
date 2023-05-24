#!/usr/bin/env sh
unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${unameOut}"
esac

export HOOK_NAME="$(basename -- "$0")"
echo "" && echo "[HOOK:${HOOK_NAME}]"
echo Enviroment: ${machine}

if command -v winpty &> /dev/null
then
  echo "LOG: exec /dev/tty in enviroment"
  
  if sh -c ": >/dev/tty" >/dev/null 2>/dev/null
  then
      echo "LOG: /dev/tty is available"
      exec >/dev/tty 2>&1
      echo "LOG: success exec /dev/tty"
      export DEV_TTY_AVAILABLE=1
  else
      echo "FAIL: /dev/tty is not available"
  fi
fi

echo ""