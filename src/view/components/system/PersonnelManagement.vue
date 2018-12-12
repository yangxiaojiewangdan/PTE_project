<template>
	<div class="PersonnelManagement">
		<Button type="success" long>PersonnelManagement人员管理</Button>
		<div class="demo-split">
        <Split v-model="split1">
            <div slot="left" class="demo-split-pane" >
               		 左面
            </div>
            <div slot="right" class="demo-split-pane">
                                                            右面
            </div>
        </Split>
    </div>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                split1: 0.3,
            }
        },
    }
</script>
<style lang="less" scoped>
	.demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
</style>