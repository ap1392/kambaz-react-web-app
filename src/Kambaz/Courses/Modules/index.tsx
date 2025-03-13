import { useState } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { addModule, deleteModule, updateModule, editModule } from "./reducer";
import { RootState } from "../../store";
import { FormControl } from "react-bootstrap";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const modules = useSelector((state: RootState) => state.modulesReducer.modules);
  const dispatch = useDispatch();

  const handleAddModule = () => {
    dispatch(addModule({ name: moduleName, course: cid }));
    setModuleName("");
  };

  const handleDeleteModule = (moduleId: string) => {
    dispatch(deleteModule(moduleId));
  };

  const handleEditModule = (moduleId: string) => {
    dispatch(editModule(moduleId));
  };

  const handleUpdateModule = (module: any) => {
    dispatch(updateModule(module));
  };

  return (
    <div>
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={handleAddModule}
      />
      <div className="list-group">
        {modules.filter((module: any) => module.course === cid).map((module: any) => (
          <div key={module._id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              {module.editing ? (
                <FormControl
                  className="w-50 d-inline-block"
                  value={module.name}
                  onChange={(e) => handleUpdateModule({ ...module, name: e.target.value })}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUpdateModule({ ...module, editing: false });
                    }
                  }}
                />
              ) : (
                module.name
              )}
              <ModuleControlButtons
                moduleId={module._id}
                deleteModule={handleDeleteModule}
                editModule={handleEditModule}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
