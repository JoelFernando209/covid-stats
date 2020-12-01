export const setFetch = (url) => {
  return fetch(url, {
  	"method": "GET"
  }).then(response => response.json())
}

export const validateStr = (str) => {
  const onlyLettersAndSpaces = /^[a-z][a-z\s]*$/i;
  
  if(str.trim().length > 0 && onlyLettersAndSpaces.test(str)) {
    return true;
  } else {
    return false;
  }
}