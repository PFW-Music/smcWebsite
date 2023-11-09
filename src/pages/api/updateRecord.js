import baserow from '../../components/baserow';

export default async (req, res) => {
try{

    const { eventID, fields } = req.body; // Fields to be updated

    const response = await baserow.api.updateRow('212626', eventID, fields); // Replace 'YOUR_TABLE_ID' with the actual Baserow table ID

    if (response.status === 200) {
      res.status(200).json({ message: 'Record updated successfully' });
    } else {
      res.status(500).json({ error: 'Failed to update record' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating record' });
  }
};
