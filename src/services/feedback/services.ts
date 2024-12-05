import { useAppDispatch } from "@/stores/store";
import { useMutation } from "@tanstack/react-query";
import { createFeedback } from "@/services/feedback/api-services";
import { closeBackdrop } from "@/stores/state-slice";
import useToast from "@/hooks/use-toast";

export const useServiceCreateFeedback = () => {
  const { addToast } = useToast();
  const dispatch = useAppDispatch();
  return useMutation<TResponse, TMeta, REQUEST.TCreateFeedback>({
    mutationFn: createFeedback,
    onSuccess: (data) => {
      dispatch(closeBackdrop());
      addToast({
        type: "success",
        description: data.value.message,
      });
    },
    onError: (error) => {
      dispatch(closeBackdrop());
      addToast({
        type: "error",
        description: error.detail,
      });
    },
  });
};
