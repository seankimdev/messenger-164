import React, { useState, useRef } from "react";
import { FormControl, FilledInput, IconButton, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { postMessage } from "../../store/utils/thunkCreators";

import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";

const useStyles = makeStyles((theme) => ({
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
  fileInput: {
    display: "none",
  },
  uploadButton: {
    border: "0",
    position: "absolute",
    right: "10px",
    top: "10px",
    color: "lightgray",
  },
  previewImgsContainer: {
    gap: theme.spacing(1),
    paddingBottom: theme.spacing(2),
  },
  previewImg: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
  },
}));

const Input = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [imagesSelected, setImagesSelected] = useState("");
  const [previewUrls, setPreviewUrls] = useState([]);
  const { postMessage, otherUser, conversationId, user } = props;

  const fileInput = useRef(null);

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
      setPreviewUrls([]);
    }
  };

  const handleImgChange = (e) => {
    const files = e.target.files;
    setImagesSelected(files);
    let urls = [];
    for (const file of files) {
      urls.push(URL.createObjectURL(file));
    }
    setPreviewUrls(urls);
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
        <Grid container className={classes.previewImgsContainer}>
          {previewUrls.map((imgUrl) => {
            return (
              <img className={classes.previewImg} src={imgUrl} alt="temp-alt" />
            );
          })}
        </Grid>
        <input
          type="file"
          name="file"
          multiple
          ref={fileInput}
          onChange={handleImgChange}
          className={classes.fileInput}
        />
        <IconButton
          className={classes.uploadButton}
          onClick={() => fileInput.current.click()}
        >
          <FileCopyOutlinedIcon />
        </IconButton>
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
