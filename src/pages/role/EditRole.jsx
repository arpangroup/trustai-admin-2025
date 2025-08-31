import React, { useState } from 'react';
import PageTitle from "../../components/page_title/PageTitle";
import AccordionItem from './AccordionItem';

import {modules} from '../../data/rolesData';



const EditRole = ({ name }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const handleToggle = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };


  return (
    <div className="main-content">
      <PageTitle title="Update Role" isBack={true} />
      {/*  */}

      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-12">
            <div class="site-card">
              <div class="site-card-body">
                <div class="row">
                  <form action="/admin/roles/2" method="post">
                    <input type="hidden" name="_method" value="PUT" />
                    <input type="hidden" name="_token" value="7NrcjLzu982bkMt6OlX8RJFogDmioNU796KbvICr" />
                    <div class="site-input-groups">
                      <label for="" class="box-input-label">Role Name</label>
                      <input type="text" class="box-input" required="" name="name"
                        value="Manager" />
                    </div>

                    <div class="col-xl-12">
                      <div class="site-card">
                        <div class="site-card-header">
                          <h3 class="title mb-0">All Permissions</h3>
                        </div>
                        <div class="site-card-body">
                          <div class="row">
                            <div class="col-xl-12">
                              <div class="role-cat-items">
                                <div class="accordion">
                                  {modules.map((mod, index) => (
                                    <AccordionItem 
                                      key={mod.title}
                                      module={mod}
                                      index={index}
                                      isActive={activeIndex === index}
                                      onToggle={handleToggle}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>


                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>











      {/*  */}
    </div>
  );
};

export default EditRole;
