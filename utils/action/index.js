import API from "../API";

export const convertMongoDateToPST = mongoDate => {
    const date = new Date(mongoDate);
    const options = { weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric'
                    };
    return date.toLocaleDateString('en-US', options)
  }