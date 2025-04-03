import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import { setModules, addModule, deleteModule, updateModule, editModule } from "./reducer";
import { RootState } from "../../store";
import { FormControl } from "react-bootstrap";
import * as coursesClient from "../../Courses/client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const modules = useSelector((state: RootState) => state.modulesReducer.modules);
  const dispatch = useDispatch();
  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };
  useEffect(() => {
    fetchModules();
  }, []);
  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };


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
        addModule={createModuleForCourse}
      />
      <div className="list-group">
        {modules.map((module: any) => (
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
                deleteModule={(moduleId) => removeModule(moduleId)}
                editModule={handleEditModule}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
