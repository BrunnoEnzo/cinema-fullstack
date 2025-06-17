import React from 'react';
import { Link } from 'react-router-dom';

function Card({
  title,
  value,
  linkText,
  linkTo,
  bgColor = 'secondary',
  textColor = 'white',
  children
}) {
  return (
    <div className={`card bg-${bgColor} text-${textColor} h-100`}>
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{title}</h5>
        
        {/* Conteúdo principal */}
        {value && <p className="display-4">{value}</p>}
        {children && <div className="mb-3">{children}</div>}
        
        {/* Link/button */}
        {linkText && linkTo && (
          <Link 
            to={linkTo} 
            className={`btn btn-light custom-btn mt-auto align-self-start`}
          >
            {linkText}
          </Link>
        )}
      </div>
    </div>
  );
}

export default Card;