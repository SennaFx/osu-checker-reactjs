const apiKey = "662998c83ee1a7fa768d83b4f3d2be137a8700bf";
const url = "https://osu.ppy.sh/api/";

export default (userId, type = "get_user", gm = 0, beatmapId = null) =>
  new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    if (beatmapId == null)
      xhr.open("GET", `${url}${type}?k=${apiKey}&u=${userId}&m=${gm}`);
    else xhr.open("GET", `${url}${type}?k=${apiKey}&b=${beatmapId}`);
    xhr.responseType = "json";
    xhr.send();

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject("error");
        }
      }
    };
  });
