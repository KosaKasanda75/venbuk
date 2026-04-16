import { useState } from "react";

function ReadDictionaryDetails() {
  const [viewMode, setViewMode] = useState(true);

  function handleCreate() {
    // Requires a refetch of dictionaries
  }

  function handleUpdate() {
    // Requires a refetch of dictionaries
  }

  function handleCancel() {
    setViewMode(true);
  }

  function handleDelete() {
    // Requires a refetch of dictionaries
    setViewMode(true);
  }

  return (
    <>
      {viewMode && (
        <div>
          <h1>Dictionary Name</h1>
        </div>
      )}
      {!viewMode && (
        <AddDictionary
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}

export default ReadDictionaryDetails;
