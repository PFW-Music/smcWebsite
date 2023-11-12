import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'PATCH') {
    try {
      const { row_id, data } = req.body; // Assuming data is passed in the request body

      const baserowResponse = await axios.patch(
        `https://api.baserow.io/api/database/rows/table/212626/${row_id}/?user_field_names=true`,
        data, // data is already an object, no need to stringify
        {
          headers: {
            'Authorization': `Token HbYQMdxStJRoUvVLyjjegU0s86MIQY9F`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Check if the update was successful
      if (baserowResponse.status === 200) {
        res.status(200).json({ message: 'Record updated successfully', data: baserowResponse.data });
      } else {
        res.status(baserowResponse.status).json({
          error: 'Failed to update record',
          details: JSON.stringify(baserowResponse.data)
        });
      }
    } catch (error) {
      console.error('Error in PATCH request:', error);
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.response ? JSON.stringify(error.response.data) : 'No response data'
      });
    }
  } else {
    res.setHeader('Allow', ['PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
