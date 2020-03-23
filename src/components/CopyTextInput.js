import React, { useState } from "react"

const copyInputValue = (clickEvent, setCopied) => {
  navigator.clipboard.writeText(clickEvent.target.value);
  setCopied(true);
};

export default props => {
  const [linkCopied, setCopied] = useState(false);
  return (
    <>
      <input type='text'
             readOnly
             className={props.className}
             value={props.value}
             onClick={e => copyInputValue(e, setCopied)}
      />
      <p className='has-text-centered'>
        { linkCopied ? '¡Enlace copiado!' : 'Haz click para copiar el enlace' }
      </p>
    </>
  );
};