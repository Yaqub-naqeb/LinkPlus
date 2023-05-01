import React, { useState } from 'react'

const useImageFetch = ({ imageUrl }) => {
    const [photo, setPhoto] = useState(null);

  
    useEffect(() => {
      const uploadFile = () => {
        const name = new Date().getTime() + photo.name;
        const storageRef = ref(storage, `images/${name}`);
        const uploadTask = uploadBytesResumable(storageRef, photo);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}'% done`);
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error);
          },
          () => {
            // Handle successful uploads on complete
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL);
              console.log(imageUrl);
            });
          }
        );
      };
      if (photo) {
        uploadFile();
      }
    }, [photo]);
  return (
    <div>
      
    </div>
  )
}

export default useImageFetch
