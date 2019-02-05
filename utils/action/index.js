// import API from "../API";

export const convertMongoDateToPST = mongoDate => {
    const date = new Date(mongoDate);
    const options = {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    };
    return date.toLocaleDateString('en-US', options)
  }

export const convertUnixToTime = unixStamp => {
  const time = new Date(parseInt(unixStamp));
  const options = {
    hour: 'numeric',
    minute: 'numeric'
  }
  return time.toLocaleTimeString('en-US', options);
}