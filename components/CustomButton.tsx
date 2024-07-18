import { cn } from "@/lib/utils";
import { Text, TouchableOpacity } from "react-native";

const CustomButton = ({
  label,
  handlePress,
  containerClassName,
  textClassName,
  isLoading,
}: {
  label: string;
  handlePress?: () => void;
  isLoading?: boolean;
  containerClassName?: string;
  textClassName?: string;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      className={cn(
        `bg-secondary rounded-xl mt-4 min-h-[62px] w-full justify-center items-center`,
        containerClassName,
        isLoading && "opacity-50"
      )}
      onPress={handlePress}
    >
      <Text
        className={cn("text-primary font-psemibold text-lg", textClassName)}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
