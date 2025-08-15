import {React,useState,useEffect} from 'react'
  import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
    const [shortUrl, setShortUrl] = useState("");
    async function handleOnSubmit(e) {
      e.preventDefault();

      const res = await fetch("/api/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ url }),
      });

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server error: ${res.status} - ${errText}`);
      }

      const data = await res.json();
      console.log(data);
      setShortUrl(`http://localhost:3000/api/url/${data.shortId}`);
  }

  const [userData, setUserData] = useState([]);
  const getData = async () => {
    const res = await fetch("/api/url/analytics", { credentials: "include" });
    if (!res.ok) {
      console.error("Failed to fetch user analytics");
      return;
    }
    const data = await res.json();
    setUserData(data);
  };

  useEffect(() => {
    getData();
  }, [userData]);

    return (
      <>
        <div>
          <form
            onSubmit={handleOnSubmit}
            action=""
            className="main w-[100vw] h-[100vh] flex flex-col justify-center items-center gap-5"
          >
            <h1 className="text-center text-7xl font-bold text-info">
              URL Shortner
            </h1>
            <div className="flex justify-center items-center gap-3">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter your url"
                className="input w-[250px] input-info"
              />
              <button className="btn btn-soft btn-info">Create</button>
            </div>
            <div className="flex border-2 border-info rounded-2xl p-5 mt-5 justify-center gap-3 items-center">
              <label htmlFor="shortId" className="text-info font-bold">
                Your Short URL :{" "}
              </label>
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-info font-semibold underline"
              >
                {shortUrl}
              </a>
            </div>
            <div className="flex flex-col border-2 border-info rounded-2xl p-5 mt-5 justify-center gap-3 items-center">
              <h1 className="text-2xl font-bold text-info">
                History & AnaLystics
              </h1>
              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>S.no</th>
                      <th>ShortID</th>
                      <th>Redirect</th>
                      <th>Clicks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((user, index) => (
                      <tr key={user._id}>
                        <th>{index + 1}</th>
                        <td>{user.shortId}</td>
                        <td>{user.redirectURL}</td>
                        <td>{user.visitHistory.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </form>
        </div>
      </>
    );
}

export default HomePage