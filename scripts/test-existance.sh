#!/bin/bash

find_code_files () {
  find . -regex '^\./src/[^index][a-z0-9\/\-]*\.[tj]s'
}

find_test_files () {
  echo $@ | sed -e 's/src/tests/g' -e 's/\.ts/.spec.ts/g'
}


main (){ 
  code_files=$(find_code_files)
  test_files=$(find_test_files $code_files)

  ret=true
  for file in $test_files
  do
    if test -f $file
    then true
    else
      ret=false
      echo $( echo $file | sed -e 's/\.spec//' -e 's/tests/src/') does not have a test file!
    fi
  done

  $ret
}

main

