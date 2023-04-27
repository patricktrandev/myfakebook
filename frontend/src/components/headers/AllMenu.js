import React, { useRef, useState } from "react";
import { menu, create } from "../../data/AllMenu";
import { AllMenuItem } from "./AllMenuItem";
import { CreateItem } from "./CreateItem";
export const AllMenu = () => {
  return (
    <div className="all_menu">
      <div className="all_menu_header">Menu</div>
      <div className="all_menu_wrap scrollbar">
        <div className="all_left">
          <div className="all_menu_search">
            <i className="amm_s_ic"></i>
            <input type="text" placeholder="Search Menu" />
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Social</div>
            {menu.slice(0, 6).map((item, i) => {
              return (
                <AllMenuItem
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              );
            })}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Entertainment</div>
            {menu.slice(6, 9).map((item, i) => {
              return (
                <AllMenuItem
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              );
            })}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Shopping</div>
            {menu.slice(9, 11).map((item, i) => {
              return (
                <AllMenuItem
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              );
            })}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Personal</div>
            {menu.slice(11, 15).map((item, i) => {
              return (
                <AllMenuItem
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              );
            })}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Professional</div>
            {menu.slice(15, 17).map((item, i) => {
              return (
                <AllMenuItem
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              );
            })}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">Community Resources</div>
            {menu.slice(17, 21).map((item, i) => {
              return (
                <AllMenuItem
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              );
            })}
          </div>
          <div className="all_menu_group">
            <div className="all_menu_group_header">More from Meta</div>
            {menu.slice(21, 23).map((item, i) => {
              return (
                <AllMenuItem
                  key={item.name}
                  name={item.name}
                  icon={item.icon}
                  description={item.description}
                />
              );
            })}
          </div>
        </div>
        <div className="all_right">
          <div className="all_right_header">Create</div>
          {create.map((item, i) => {
            return (
              <CreateItem key={item.name} icon={item.icon} name={item.name} />
            );
          })}
        </div>
      </div>
    </div>
  );
};
