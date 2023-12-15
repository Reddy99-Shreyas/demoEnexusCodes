import { LightningElement } from 'lwc';
import { openTab, getFocusedTabInfo, openSubtab, focusTab, refreshTab, closeTab} from 'lightning/platformWorkspaceApi';

export default class WorkspaceAPIDemo extends LightningElement {
    openNewTabHandler(){
        openTab({
            recordId: '0065j00001PNug1AAD',
            focus: true,
            label: 'LWC Demo label'
        })
    }

    async openNewSubTabHandler(){
        let focusedTab = await getFocusedTabInfo();
        openSubtab(
            focusedTab.tabId,
            {
                recordId: '0065j00001PNug1AAD',
                focus: true,
                label: 'LWC Demo label'
            }
        )
    }

    async refreshTabHandler(){
        let focusedTab = await getFocusedTabInfo();
        refreshTab(focusedTab.tabId)
    }

    async closeTabHandler(){
        let focusedTab = await getFocusedTabInfo();
        closeTab(focusedTab.tabId)
    }
}