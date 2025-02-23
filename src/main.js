import {
    bootstrapCameraKit, 
    createMediaStreamSource, 
    Transform2D,
    } from '@snap/camera-kit'

    (async function(){
    var cameraKit = await bootstrapCameraKit({ apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNjY0NzQ4ODkzLCJzdWIiOiJjYmM3NTUxOS1hYTAzLTRiZDMtOTIzMi04NjA3ZDU5YzE3Zjl-U1RBR0lOR35hYzlhYTRhNC1iODUzLTQ1OWItOWJjNS04ODExYzM4N2VkNzIifQ.r4YbsWJp4kRUPAkokn2naKXDt8cMaqXurg02gyVqVvA' })

    const session = await cameraKit.createSession()
    document.getElementById ('canvas').replaceWith (session.output.live)

    const { lenses } = await cameraKit.lensRepository.loadLensGroups (['9cfe149b-dcf3-46c0-8bd4-cb3a98f43cc9'])

    session.applyLens (lenses[0])
    let mediaStream = await navigator. mediaDevices.getUserMedia ({ video: true });

    const source = createMediaStreamSource(mediaStream, {
    transform: Transform2D.MirrorX, 
    cameraType: 'front'
    })

    await session.setSource(source)

    session.source.setRenderSize (window.innerWidth, window.innerHeight)

    session. play ()
    })();