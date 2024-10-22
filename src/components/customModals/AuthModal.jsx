"use client";
import { Box, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import LoginModule from "../authComponents/LoginModule";
import SignUpModule from "../authComponents/SignUpModule";

const AuthModal = ({ isAuthModal, setAuthModal }) => {
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("login");
  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-white">
      <Modal
        open={isAuthModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[450px] bg-white bg-slate-900 rounded-[8px] shadow-lg p-4 relative">
          {/* Close button */}
          <button
            className="absolute top-2 right-2 p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:text-white"
            onClick={() => setAuthModal(false)}
            aria-label="Close"
          >
            <span className="text-xl">&times;</span>
          </button>

          {/* Modal Title */}
          <Typography
            className="dark:text-white text-black"
            variant="h6"
            component="h2"
          >
            {route === "login" && "Login Now"}
            {route === "signUp" && "Sign-Up"}
          </Typography>

          {/* Modal Content */}
          <Typography sx={{ mt: 2 }}>
            <div>
              {route === "login" && (
                <LoginModule
                  route={route}
                  setRoute={setRoute}
                  setAuthModal={setAuthModal}
                />
              )}
              {route === "signUp" && (
                <SignUpModule setRoute={setRoute} setAuthModal={setAuthModal} />
              )}
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
