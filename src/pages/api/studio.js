export default async function handler(req, res) {
    const baseUrl = "https://api.baserow.io/api/database/rows/table/212625/";
    const queryParams = "?user_field_names=true&filters=%7B%22filter_type%22%3A%22AND%22%2C%22filters%22%3A%5B%7B%22type%22%3A%22boolean%22%2C%22field%22%3A%22Bookable%22%2C%22value%22%3A%221%22%7D%2C%7B%22type%22%3A%22multiple_select_has%22%2C%22field%22%3A%22Purpose%22%2C%22value%22%3A%221103750%22%7D%5D%2C%22groups%22%3A%5B%5D%7D";
    
    try {
      const response = await fetch(`${baseUrl}${queryParams}`, {
        method: 'GET',
        headers: {
          'Authorization': `Token HbYQMdxStJRoUvVLyjjegU0s86MIQY9F`
        }
      });
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ error: "Error fetching data" });
    }
  }
  