const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('status', 'PENDING'); // Set initial status as PENDING
      if (image) {
        formData.append('image', image);
      }

      await axios.post('http://localhost:8085/api/products', formData);
      alert('Product submitted for admin approval. It will be listed after review.');
      // Reset form
      setTitle('');
      setDescription('');
      setPrice('');
      setCategory('');
      setImage(null);
      
    } catch (error) {
      console.error('Error submitting product:', error);
      alert('Failed to submit product');
    }
  };