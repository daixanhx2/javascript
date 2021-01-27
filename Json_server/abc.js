const userAction = async(fieldApi) => {
    const response = await fetch(fieldApi);
    const myJson = await response.json(); //extract JSON from the http response
    console.log(myJson);
    // do something with myJson
}
userAction('http://localhost:3000/fields');