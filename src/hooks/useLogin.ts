import { loginCredentials } from "@/services/loginCredentials";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogin = (disco: string) => {
  const router = useRouter();
  return useMutation({
    mutationFn: loginCredentials,
    onSuccess: (status) => {
      if (status === 200) {
        router.push(`/disco/${disco}`);
      }
    },
  });
};

export default useLogin;
