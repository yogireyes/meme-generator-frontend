import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URI } from "../env";
import NavbarDefault from '../components/NavbarDefault';
import EditorControls from '../components/EditorControls';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import app, { storage } from '../config';

function Editor() {
  const storage = getStorage();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const imageData = queryParams.get("img_data");
  const [parsedImageData, setParsedImageData] = useState(null);
  const [text, setText] = useState("");
  const [isDraggingText, setIsDraggingText] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(25);
  const [fontColor, setFontColor] = useState('#ffffff');
  const [fontBackgroundColor, setFontBackgroundColor] = useState('#808080');
  const [isBackgroundChecked, setIsBackgroundChecked] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [paddingX, setPaddingX] = useState(0);
  const [paddingY, setPaddingY] = useState(0);
  const [isOverlayChecked, setIsOverlayChecked] = useState(false);
  const [overlayColorIntensity, setOverlayColorIntensity] = useState(0.5);

  useEffect(() => {
    if (imageData) {
      const parsedData = JSON.parse(decodeURIComponent(imageData));
      setParsedImageData(parsedData);
    }
  }, [imageData]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
  };

  const handleFontSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setFontSize(newSize);
  };

  const handleFontColorChange = (e) => {
    const newColor = e.target.value;
    setFontColor(newColor);
  };

  const handleFontBackgroundColorChange = (e) => {
    const newBackgroundColor = e.target.value;
    setFontBackgroundColor(newBackgroundColor);
  };

  const handleBackgroundCheckboxChange = (e) => {
    setIsBackgroundChecked(e.target.checked);
  };

  const handleBoldChange = (e) => {
    const boldChecked = e.target.checked;
    setIsBold(boldChecked);
  };

  const handleItalicChange = (e) => {
    const italicChecked = e.target.checked;
    setIsItalic(italicChecked);
  };

  const handlePaddingXChange = (e) => {
    const newPaddingX = e.target.value;
    setPaddingX(newPaddingX);
  };

  const handlePaddingYChange = (e) => {
    const newPaddingY = e.target.value;
    setPaddingY(newPaddingY);
  };

  const handleOverlayCheckboxChange = (e) => {
    setIsOverlayChecked(e.target.checked);
  };

  const handleOverlayColorIntensityChange = (e) => {
    const newIntensity = parseFloat(e.target.value);
    setOverlayColorIntensity(newIntensity);
  };

  const handleTextMouseDown = (e) => {
    setIsDraggingText(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleTextMouseMove = (e) => {
    if (isDraggingText) {
      if (parsedImageData) {
        const textElement = document.querySelector('.draggable-text');

        const textWidth = textElement.offsetWidth;
        const textHeight = textElement.offsetHeight;

        const maxX = parsedImageData.webformatWidth - textWidth;
        const maxY = parsedImageData.webformatHeight - textHeight;

        let newX = textPosition.x + e.clientX - dragStart.x;
        let newY = textPosition.y + e.clientY - dragStart.y;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        setTextPosition({
          x: newX,
          y: newY,
        });
        setDragStart({ x: e.clientX, y: e.clientY });
      }
    }
  };

  const handleTextMouseUp = () => {
    setIsDraggingText(false);
  };

  const saveHandler = async () => {
    try {
      const response = await axios.post(`${SERVER_URI}/process_image`, {
        image: parsedImageData.webformatURL,
        text,
        font_size: fontSize,
        font_color: fontColor,
        background_color: fontBackgroundColor,
        background_enabled: isBackgroundChecked,
        is_bold: isBold,
        is_italic: isItalic,
        padding_x: paddingX,
        padding_y: paddingY,
        overlay_enabled: isOverlayChecked,
        overlay_intensity: overlayColorIntensity,
        text_position: {
          x: textPosition.x / parsedImageData.webformatWidth,
          y: textPosition.y / parsedImageData.webformatHeight,
        },
      });
      const processedImage = response.data;
      if (processedImage.status === 'success') {
        const originalFilename = processedImage.img.split('/').pop();
        const imageBlob = await fetch(processedImage.img).then(res => res.blob());

        const storageRef = ref(storage, `images/${originalFilename}`);

        // Convert the imageBlob into a Uint8Array
        const arrayBuffer = await imageBlob.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);

        // Upload bytes to Firebase Storage
        uploadBytes(storageRef, uint8Array).then(async (snapshot) => {
          console.log('Image uploaded as bytes:', snapshot);

          // Get the download URL for the uploaded image
          const downloadURL = await getDownloadURL(storageRef);

          try {
            const backendResponse = await axios.post(`${SERVER_URI}/storeapi`, {
              text: text,
              image_url: downloadURL
            });
      
            console.log('Backend Response:', backendResponse.data);
          } catch (error) {
            console.error('Error sending data to backend:', error);
          }
        });
      } else {
        console.error('Image processing failed:', processedImage.error);
      }
    } catch (error) {
      console.error('Error processing image on the server:', error);
    }
  };

  const exportHandler = async () => {
    try {
      const response = await axios.post(`${SERVER_URI}/process_image`, {
        image: parsedImageData.webformatURL,
        text,
        font_size: fontSize,
        font_color: fontColor,
        background_color: fontBackgroundColor,
        background_enabled: isBackgroundChecked,
        is_bold: isBold,
        is_italic: isItalic,
        padding_x: paddingX,
        padding_y: paddingY,
        overlay_enabled: isOverlayChecked,
        overlay_intensity: overlayColorIntensity,
        text_position: {
          x: textPosition.x / parsedImageData.webformatWidth,
          y: textPosition.y / parsedImageData.webformatHeight,
        },
      });
      const processedImage = response.data;
      if (processedImage.status === 'success') {
        const originalFilename = processedImage.img.split('/').pop();
        const imageBlob = await fetch(processedImage.img).then(res => res.blob());
        const link = document.createElement('a');
        link.href = URL.createObjectURL(imageBlob);
        link.download = originalFilename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.error('Image processing failed:', processedImage.error);
      }
    } catch (error) {
      console.error('Error processing image on the server:', error);
    }
  };

  return (
    <>
      <style>{`
                .draggable-text {
                    position: absolute;
                    left: ${textPosition.x}px;
                    top: ${textPosition.y}px;
                    user-select: none;
                    cursor: ${isDraggingText ? 'grabbing' : 'grab'};
                    white-space: pre-line;
                    font-size: ${fontSize}px;
                    color: ${fontColor};
                    background-color: ${isBackgroundChecked ? fontBackgroundColor : 'transparent'};
                    font-weight: ${isBold ? 'bold' : 'normal'};
                    font-style: ${isItalic ? 'italic' : 'normal'};
                    padding: ${paddingX}px ${paddingY}px;
                }
                .overlay {
                    background-color: rgba(0, 0, 0, ${overlayColorIntensity});
                }
            `}</style>
      <NavbarDefault />
      <div className="container">
        <div className="card card-body mt-5">
          <div className="row">
            <div className="col-12 text-center">
                <h4 className="text-muted">Design Your Meme</h4>
                <hr className="text-muted w-25 mx-auto mt-2" />
            </div>
            <EditorControls
              text={text}
              fontSize={fontSize}
              fontColor={fontColor}
              fontBackgroundColor={fontBackgroundColor}
              isBackgroundChecked={isBackgroundChecked}
              isBold={isBold}
              isItalic={isItalic}
              paddingX={paddingX}
              paddingY={paddingY}
              isOverlayChecked={isOverlayChecked}
              overlayColorIntensity={overlayColorIntensity}
              handleTextChange={handleTextChange}
              handleFontSizeChange={handleFontSizeChange}
              handleFontColorChange={handleFontColorChange}
              handleFontBackgroundColorChange={handleFontBackgroundColorChange}
              handleBackgroundCheckboxChange={handleBackgroundCheckboxChange}
              handleBoldChange={handleBoldChange}
              handleItalicChange={handleItalicChange}
              handlePaddingXChange={handlePaddingXChange}
              handlePaddingYChange={handlePaddingYChange}
              handleOverlayCheckboxChange={handleOverlayCheckboxChange}
              handleOverlayColorIntensityChange={handleOverlayColorIntensityChange}
            />
            <div className="col-md-6 border-sm text-center">
              <h6 className="text-muted text-center mb-1">Preview</h6>
              <hr className="text-muted mt-0" />
              <div
                className="position-relative"
                onMouseMove={handleTextMouseMove}
              >
                {parsedImageData && (
                  <img src={parsedImageData.webformatURL} className="img-fluid rounded shadow-sm" alt="Preview" />
                )}
                {isOverlayChecked && (
                  <div className="overlay"></div>
                )}
                {text && (
                  <div
                    className="draggable-text"
                    onMouseDown={handleTextMouseDown}
                    onMouseUp={handleTextMouseUp}
                    style={{
                      position: 'absolute',
                      left: `${textPosition.x}px`,
                      top: `${textPosition.y}px`,
                      fontSize: `${fontSize}px`,
                      color: fontColor,
                      backgroundColor: isBackgroundChecked ? fontBackgroundColor : 'transparent',
                      fontWeight: isBold ? 'bold' : 'normal',
                      fontStyle: isItalic ? 'italic' : 'normal',
                      padding: `${paddingX}px ${paddingY}px`,
                      display: 'inline-block',
                    }}
                  >
                    {text}
                  </div>
                )}
              </div>
            </div>
            <div className="col-12 text-center">
                <hr className="text-muted" />
                <button type="button" className="btn btn-success" onClick={saveHandler}>Save <i className="fas fa-save"></i></button>
                <small className="text-muted"> or </small>
                <button type="button" className="btn btn-primary" onClick={exportHandler}>Export <i className="fas fa-cloud-download-alt"></i></button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Editor;
