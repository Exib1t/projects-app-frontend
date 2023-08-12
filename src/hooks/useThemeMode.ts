import { useEffect } from "react";
import { setTheme } from "../store/reducers/globalSlicer";
import { useAppDispatch, useAppSelector } from "./global";

export function useThemeMode() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.global);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "light" || theme === "dark") {
      dispatch(setTheme(theme));
    }
  }, []);

  return theme;
}
