import axios from "axios"
export async function login(loginInfo) {
  let resp = await axios.post(
    "/api/user/login",
    loginInfo
  )
  let token = resp.headers.authorization
  if (token) {
    localStorage.setItem("token", token)
  }
  return resp.data
}

export async function whoAmI() {
  let token = localStorage.getItem("token")
  if (!token) {
    return null
  }
  var resp = await axios.get("/api/user/whoami", {
    headers: {
      authorization: `bearer ${token}`
    }
  })
  return resp.data.data
}

export function loginOut(){
  localStorage.removeItem("token")
}

export async function reg(userInfo){
  let resp = await axios.post("/api/user/reg", userInfo);
  return resp
}