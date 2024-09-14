/* eslint-disable react/prop-types */
import styled from "styled-components";
import useUser from "../features/authentication/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const FullPage = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  `;
  const { isLoading, isAuthenticated } = useUser();
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) {
        navigate("/");
      }
    },
    [isAuthenticated, navigate, isLoading]
  );
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated && !isLoading) return children;
}

export default ProtectedRoute;
