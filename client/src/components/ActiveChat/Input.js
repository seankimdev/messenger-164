import React, { useState } from "react";
import { FormControl, FilledInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

const useStyles = makeStyles(() => ({
  root: {
    justifySelf: "flex-end",
    marginTop: 15,
  },
  input: {
    height: 70,
    backgroundColor: "#F4F6FA",
    borderRadius: 8,
    marginBottom: 20,
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [imagesSelected, setImagesSelected] = useState("");
  const { postMessage, otherUser, conversationId, user } = props;

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const uploadImage = async () => {
    // setImageUrls([]);
    const imgUrlArr = [];
    for (const image of imagesSelected) {
      const formData = new FormData();
      formData.append("upload_preset", "tprhpi9l");
      formData.append("file", image);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/ddnvwcgij/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const resJson = await response.json();
      imgUrlArr.push(resJson.secure_url);
    }
    return imgUrlArr;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (text || imagesSelected) {
      // add sender user info if posting to a brand new convo, so that the other user will have access to username, profile pic, etc.
      const imageUrls = await uploadImage();
      const reqBody = {
        recipientId: otherUser.id,
        conversationId,
        sender: conversationId ? null : user,
        text: e.target.text.value,
        attachments: imageUrls,
      };
      await postMessage(reqBody);
      setText("");
      setImagesSelected("");
    }
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <FormControl fullWidth hiddenLabel>
        <FilledInput
          classes={{ root: classes.input }}
          disableUnderline
          placeholder="Type something..."
          value={text}
          name="text"
          onChange={handleChange}
        />
        <input
          type="file"
          name="file"
          multiple
          onChange={(e) => {
            console.log(e.target.files);
            setImagesSelected(e.target.files);
          }}
        />
      </FormControl>
    </form>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    postMessage: (message) => {
      dispatch(postMessage(message));
    },
  };
};

export default connect(null, mapDispatchToProps)(Input);
