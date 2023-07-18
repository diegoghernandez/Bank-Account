const API = "http://localhost:8090/api/accounts";

export const getAccountData = async (email) => {
   const token = localStorage.getItem("token");
   console.log(token);

   const response = await fetch(`${API}/email/${email}`, {
      method: "GET",
      headers: {
         "Content-Type": "application/json",
         "Authorization": token
      },
   });

   const account = await response.json();
   localStorage.setItem("account", JSON.stringify(account));
}