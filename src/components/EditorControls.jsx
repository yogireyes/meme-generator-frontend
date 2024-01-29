import React from 'react';

function EditorControls({
  text,
  fontSize,
  fontColor,
  fontBackgroundColor,
  isBackgroundChecked,
  isBold,
  isItalic,
  paddingX,
  paddingY,
  isOverlayChecked,
  overlayColorIntensity,
  handleTextChange,
  handleFontSizeChange,
  handleFontColorChange,
  handleFontBackgroundColorChange,
  handleBackgroundCheckboxChange,
  handleBoldChange,
  handleItalicChange,
  handlePaddingXChange,
  handlePaddingYChange,
  handleOverlayCheckboxChange,
  handleOverlayColorIntensityChange,
}) {
  return (
    <div className="col-md-6 d-flex flex-column mb-2">
      <h6 className="text-muted text-center mb-1">Editor</h6>
      <hr className="text-muted mt-0" />
      <textarea
        className="form-control mb-3"
        placeholder="write text here..."
        rows="2"
        onChange={handleTextChange}
        value={text}
      />
      <div className="fw-bold text-muted mb-3">
        Font Size:&nbsp;
        <input
          type="number"
          className="form-control w-25 d-inline"
          value={fontSize}
          onChange={handleFontSizeChange}
        />&nbsp;px
      </div>
      <table>
        <tbody>
          <tr>
            <td>
              <div className="fw-bold text-muted d-flex mb-2">Font Color&nbsp;
                <input type="color" className="border-0" value={fontColor} onChange={handleFontColorChange} />
              </div>
            </td>
            <td>
              <div className="fw-bold text-muted d-flex mb-2">Bold Text&nbsp;
                <input type="checkbox" className="form-check-input" checked={isBold} onChange={handleBoldChange} />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="fw-bold text-muted d-flex mb-2">Background Color&nbsp;
                <input type="color" className="border-0" value={fontBackgroundColor} onChange={handleFontBackgroundColorChange} />&nbsp;
                <input type="checkbox" className="form-check-input" checked={isBackgroundChecked} onChange={handleBackgroundCheckboxChange} />
              </div>
            </td>
            <td>
              <div className="fw-bold text-muted d-flex mb-2">Italic&nbsp;
                <input type="checkbox" className="form-check-input" checked={isItalic} onChange={handleItalicChange} />
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <div className="fw-bold text-muted d-flex align-items-center mb-2">Padding&nbsp;
                <input type="number" className="form-control padding_field" value={paddingX} onChange={handlePaddingXChange} />
                <input type="number" className="form-control padding_field" value={paddingY} onChange={handlePaddingYChange} />&nbsp;px
              </div>
            </td>
          </tr>
          <tr>
            <td colSpan="2">
              <hr className="text-muted my-2" />
            </td>
          </tr>
          <tr>
            <td>
              <div className="fw-bold text-muted d-flex mb-2">Overlay&nbsp;
                <input type="checkbox" className="form-check-input" checked={isOverlayChecked} onChange={handleOverlayCheckboxChange} />
              </div>
            </td>
          </tr>
          <tr>
            <td>
            </td>
            <td>
              <div className="fw-bold text-muted d-flex align-items-center mb-2">Intensity&nbsp;
                <input type="number" className="form-control w-50" step="0.1" min="0" max="1" value={overlayColorIntensity} onChange={handleOverlayColorIntensityChange} />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EditorControls;