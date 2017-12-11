<template>
  <div id="sfTab1">
    <el-table :data="tableData3" :border="false" :height="400" style="width: 100%" show-summary :header-row-class-name="setHeader">
      <el-table-column prop="date" label="TJ" width="120" align="center">
      </el-table-column>
      <el-table-column prop="jrNum" label="JR机构（个）" width="120" align="center">
      </el-table-column>
      <el-table-column label="申请任务（次）" align="center" label-class-name="merge">
        <el-table-column prop="name" label="总数" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="查询" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="BK" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="DJ" width="80" align="center">
        </el-table-column>
        <el-table-column prop="name" label="ZF" width="80" align="center">
        </el-table-column>
        <el-table-column prop="value1" label="ZF" width="80" :sortable="true" align="center">
        </el-table-column>
        <el-table-column prop="value2" label="DY" width="80" :sortable="true" align="center">
        </el-table-column>
      </el-table-column>
      <el-table-column prop="jrNum" label="反馈结果（条）" width="120" align="center">
      </el-table-column>
      <el-table-column prop="jrNum" label="备注" width="120" align="center">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'sfTab1',
  data() {
    return {
      tableData3: [
        {
          date: 'JST',
          jrNum: 12,
          name: '王小虎',
          value1: 12,
          value2: 12,
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: 'JST',
          jrNum: 12,
          name: '王小虎',
          value1: 15,
          value2: 8,
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ]
    }
  },
  methods: {
    setHeader(row) {
      return `el_header_${row.rowIndex}`
    }
  }
}
</script>

<style>
#sfTab1 .el-table td,
#sfTab1 .el-table th {
  border-color: #000;
  border-width: 0;
  padding: 2px;
}
#sfTab1 .el-table__body-wrapper {
  margin-top: 3px;
}
#sfTab1 .el-table--border {
  border-width: 0;
}

#sfTab1 .el-table--border::after,
.el-table--group::after,
#sfTab1 .el-table::before {
  width: 0;
}

#sfTab1 .el_header_0 th {
  padding: 1px;
  background: rgba(0, 211, 255, 0.2);
  border-right: 2px solid #000;
}
#sfTab1 .el_header_0 th.merge {
  border-right-width: 0;
  border-bottom: 2px solid transparent;
  border-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0) 0.1,
      rgba(0, 0, 0, 1) 0.5,
      rgba(0, 0, 0, 0) 0.9
    )
    30 30;
}
#sfTab1 .el_header_0 th.merge + th {
  border-left: 2px solid #000;
}
#sfTab1 .el_header_0 th:nth-last-of-type(2) {
  border-width: 0;
}
#sfTab1 .el_header_1 th {
  padding: 1px;
  background: rgba(0, 211, 255, 0.2);
}
</style>
