import { defineStore } from "pinia";

export const useBaseTableStore = defineStore({
  id: "useBaseTableStore",
  state: () => ({
    dataEdit: {},
    refreshData:0,
    closeDialog:false
  }),
  actions:  {
     refreshTable(){
        this.refreshData += 1
     },
     handleCloseDialog() {
        this.closeDialog = !this.closeDialog
     }
  },
});
