import React from 'react';

// functional component with props deconstructing syntax is cleaner
const CheckedHeader = ({ checkedItemCount }) => {
  return (
    <div>
      {checkedItemCount} Checked item
    </div>
  );
};

export default CheckedHeader