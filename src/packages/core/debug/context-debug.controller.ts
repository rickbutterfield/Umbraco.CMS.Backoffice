import { contextData, umbDebugContextEventType } from '@umbraco-cms/backoffice/context-api';
import { UmbBaseController, UmbControllerHost } from '@umbraco-cms/backoffice/controller-api';

// Temp controller to get the code away from the app.element.ts
export class UmbContextDebugController extends UmbBaseController {
	constructor(host: UmbControllerHost) {
		super(host);
	}

	hostConnected(): void {
		super.hostConnected();
		// Maybe this could be part of the context-api? When we create a new root, we could attach the debugger to it?
		// Listen for the debug event from the <umb-debug> component
		this.getHostElement().addEventListener(umbDebugContextEventType, this.#onContextDebug as unknown as EventListener);
	}

	#onContextDebug = (event: any) => {
		// Once we got to the outter most component <umb-app>
		// we can send the event containing all the contexts
		// we have collected whilst coming up through the DOM
		// and pass it back down to the callback in
		// the <umb-debug> component that originally fired the event
		if (event.callback) {
			event.callback(event.instances);
		}

		// Massage the data into a simplier format
		// Why? Can't send contexts data directly - browser seems to not serialize it and says its null
		// But a simple object works fine for browser extension to consume
		const data = {
			contexts: contextData(event.instances),
		};

		// Emit this new event for the browser extension to listen for
		this.getHostElement().dispatchEvent(new CustomEvent('umb:debug-contexts:data', { detail: data, bubbles: true }));
	};

	hostDisconnected(): void {
		super.hostDisconnected();
		this.getHostElement().removeEventListener(
			umbDebugContextEventType,
			this.#onContextDebug as unknown as EventListener,
		);
	}
}