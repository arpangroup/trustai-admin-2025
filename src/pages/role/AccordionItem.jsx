import { LuCheck } from "react-icons/lu";

const AccordionItem = ({ module, index, isActive, onToggle }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className={`accordion-button ${!isActive ? 'collapsed' : ''}`}
          type="button"
          onClick={() => onToggle(index)}
        >
           
          <span className="icon"> <LuCheck/></span>
          {module.title}
        </button>
      </h2>
      {isActive && (
        <div className="accordion-collapse show">
          <div className="accordion-body">
            <div className="row">
              {module.permissions.map((perm) => (
                <div
                  key={perm.id}
                  className="col-xl-3 col-lg-3 col-md-6 col-sm-6"
                >
                  <div className="form-check form-switch role-permission-switch">
                    <label className="switch-label" htmlFor={perm.id}>
                      {perm.label}
                    </label>
                    <input
                      className="form-check-input big"
                      type="checkbox"
                      role="switch"
                      id={perm.id}
                      name="permission[]"
                      value={perm.value}
                      defaultChecked={perm.checked || false}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccordionItem;