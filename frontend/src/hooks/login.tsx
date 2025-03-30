import { useMutation } from "@tanstack/react-query";
import { fetchUsers } from "../api/login";

export const ValidateHook = () => {
  return useMutation({ mutationFn: fetchUsers });
};
