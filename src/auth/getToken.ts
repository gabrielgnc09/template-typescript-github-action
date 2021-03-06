const {error} = require('@actions/core')
const axios = require('axios').default

export function getToken(creatorEmail: string, creatorPassword: string) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      query: `mutation{
      authenticationByEmail(email:"${creatorEmail}", password: "${creatorPassword}") {
      token
  }
}`
    })

    const config = {
      method: 'POST',
      url: 'https://app.artia.com/graphql',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    axios(config)
      .then(function (response: {data: any}) {
        const resObj = JSON.parse(JSON.stringify(response.data))
        const token = resObj.data.authenticationByEmail.token
        return resolve(token)
      })
      .catch(function (error: any) {
        console.log(error)
      })
  })
}
