import axios from 'axios';

export default {
  async afterCreate(event) {
    const { result } = event;

    try {
      await axios.post(
        'http://localhost:5000/addproducts',
        result,
        {
          headers: {
            Authorization: 'Bearer YOUR_SECRET_TOKEN_HERE',
          },
        }
      );
    } catch (error) {
      console.error('❌ Failed to send product to Node.js app:', error.message);
    }
  },
};
