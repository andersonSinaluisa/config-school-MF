;

import container from "@/lib/container";
import { Provider } from "inversify-react";

export default function InversifyProvider({ children }: { children: React.ReactNode }) {
    return <Provider container={container}>{children}</Provider>;
}
