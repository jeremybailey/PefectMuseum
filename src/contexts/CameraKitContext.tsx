import { bootstrapCameraKit, CameraKitSession, Lens } from '@snap/camera-kit';
import { createContext, useEffect, useRef, useState } from 'react';

const apiToken = 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjY0NzQ4ODkzLCJzdWIiOiJjYmM3NTUxOS1hYTAzLTRiZDMtOTIzMi04NjA3ZDU5YzE3Zjl-UFJPRFVDVElPTn4xMmFhNjZkZC0zZjdjLTQ4ZDgtYTc2NC1kMjljYWRmYmEyNGYifQ.jADIZpq3Lr9T_7dMXYjU-HG9Z40KiiL7cG4Dgp862hA';
const lensGroupId = '9cfe149b-dcf3-46c0-8bd4-cb3a98f43cc9';

export interface CameraKitState {
  session: CameraKitSession;
  lenses: Lens[];
}

export const CameraKitContext = createContext<CameraKitState | null>(null);

export const CameraKit: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isInitialized = useRef<boolean>(false);
  const [session, setSession] = useState<CameraKitSession | null>(null);
  const [lenses, setLenses] = useState<Lens[]>([]);

  useEffect(() => {
    const initializeCameraKit = async () => {
      const cameraKit = await bootstrapCameraKit({ apiToken });
      const session = await cameraKit.createSession();
      const { lenses } = await cameraKit.lensRepository.loadLensGroups([
        lensGroupId,
      ]);

      setLenses(lenses);
      setSession(session);
    };

    if (isInitialized.current) return;
    isInitialized.current = true;

    initializeCameraKit();
  }, []);

  return !session ? (
    <div>Initializing Camera Kit...</div>
  ) : (
    <CameraKitContext.Provider value={{ session, lenses }}>
      {children}
    </CameraKitContext.Provider>
  );
};
