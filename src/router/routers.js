import Main from '@/components/main'
import parentView from '@/components/parent-view'

  /**
   * iview-admin中meta除了原生参数外可配置的参数:
   * meta: {
   *  title: { String|Number|Function }
   *         显示在侧边栏、面包屑和标签栏的文字
   *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
   *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
   *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
   *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
   *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
   *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
   *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
   *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
   * }
   */

  /*
    路由的配置
      登陆页面________path: '/login'
      首页____________path: '/'
      401_____________path: '/401'
      404_____________path: '*'
      500_____________path: '/500'
      #工作台 /work
          快捷方式________path: 'work_shortcut'
          工作台__________path: 'work_workbench'
          公告____________path: 'work_Notice'
          通知____________path: 'work_notice'
          提醒____________path: 'work_remind'
      #市场营销中心 /marke
          竞争对手_________path: 'marke_competitor'
          行业动态_________path: 'marke_industry'
          市场计划_________path: 'marke_plan'
            年度计划_______path: 'marke_plan_year'
            季度计划_______path: 'marke_plan_season'
            月度计划_______path: 'marke_plan_month'
          市场方案_________path: 'marke_programme'
          市场活动_________path: 'marke_activity'
      #销售中心 /sale
          线索管理_________path: 'sale_clue'
          客户管理_________path: 'sale_customer'
          客户公海_________path: 'sale_customerSea'
          商机管理_________path: 'sale_merchant'
          订单管理_________path: 'sale_order'  
      #会员中心 /member
          学员档案_________path: 'member_studentFiles'
          入学评估_________path: 'member_admAss'
          订单管理_________path: 'member_order'
          考勤销课_________path: 'member_attendanceClass'
          学员课程_________path: 'member_studentCourse'
          学员退课_________path: 'member_studentRetreat'
          学员退课历史_____path: 'member_studentRetreatHistory'
      #教务中心  /edAd
          课程管理_________path: 'edAd_course'
            课程类型_______path: 'edAd_courseType'
            课程___________path: 'edAd_curriculum'
          课程日历_________path: 'edAd_courseCalendar'
          教室日历_________path: 'edAd_classroomCalendar'
      #门店管理 /store
          门店管理_________path: 'store_storeManagement'
          教室管理_________path: 'store_classroomManagement'
          课程日历_________path: 'store_courseCalendar'
          教室日历_________path: 'store_classroomCalendar'
      #加盟商管理 /league
          基本信息_________path: 'league_information'
          联系人___________path: 'league_contacts'
          合同管理_________path: 'league_bargain'
          开业管理_________path: 'league_opening'
          违约管理_________path: 'league_default'
            待处理违约_____path: 'league_Ofdeal'
            已处理违约_____path: 'league_Ondeal'
          考核管理_________path: 'league_assess'
            考核指标_______path: 'league_assessIndex'
            考核方案_______path: 'league_assessPlan'
            考核管理_______path: 'league_assessManagement'
            考核历史_______path: 'league_assessHistory'
          课程日历_________path: 'league_courseCalendar'
          教室日历_________path: 'league_classroomCalendar'
      #教师合伙人管理 /partner
          基本信息_________path: 'partner_information'
          更多_____________path: 'partner'
      #财务中心 /finance
          手工入账_________path: 'finance_manual'
          加盟商财务_______path: 'finance_league'
            返现___________path: 'finance_leagueCashback'
            回款___________path: 'finance_leaguemoneyBack'
            返现历史_______path: 'finance_leagueCashbackHistory'
            回款历史_______path: 'finance_leaguemoneyBackHistory'
          教师合伙人财务____path: 'Finance_partner'
            提现申请_______path: 'finance_partnerCashApply'
            提现历史_______path: 'finance_partnerCashHistory'
          交易流水_________path: 'finance_tradeFlow'
          凭证历史_________path: 'finance_certificateHistory'
          发票历史_________path: 'finance_invoiceHistory'
          支出历史_________path: 'finance_expenditureHistory'
          学员退费历史______path: 'finance_StudentRefundHistory'
      #服务中心 /serviceCentre
      #业务分析 /business
          销售_____________path: 'business_sale'
          市场_____________path: 'business_marke'
          财务_____________path: 'business_finance'
          服务_____________path: 'business_service'
          会员_____________path: 'business_member'
      #应用设置 /apply
          基础数据字典______path: 'apply_data'
          业务品牌__________path: 'apply_business'
          会员设置__________path: 'apply_member'
            会员类型________path: 'apply_memberType'
            会员升降级规则__path: 'apply_memberLiftingRule'
            积分规则配置____path: 'apply_memberIntegralRule'
            积分兑换规则____path: 'apply_memberIntegralExchange'
          市场设置__________path: 'apply_marke'
            市场来源________path: 'apply_markeSource'
            市场活动类型____path: 'apply_markeActivityType'
            市场渠道设置____path: 'apply_markeChannel'
          加盟商业务设置_____path: 'apply_league'
            合约类型________path: 'apply_leagueBargain'
            权益金规则______path: 'apply_leagueRights'
            开业过程设置_____path: 'apply_leagueOpeningProcess'
          教师合伙人业务设置_path: 'apply_partner'
            佣金规则________path: 'apply_partnerCommission'
          交易设置__________path: 'apply_trade'
            交易渠道设置____path: 'apply_tradeChannel'
            税率组设置______path: 'apply_tradeTaxRateRent'
            交易组设置______path: 'apply_tradeRent'
            交易代码设置____path: 'apply_tradeCode'
            支付代码设置____path: 'apply_tradePaymentCode'
            加盟商结算规则__path: 'apply_leagueSettlement'
            教师合伙人结算规则_path: 'apply_partnerSettlement'
        #系统设置 /system
          业务线设置________path: 'system_business'
          组织结构__________path: 'system_organization'
          职位_____________path: 'system_position'
          系统角色__________path: 'system_role'
          人员管理__________path: 'system_PersonnelManagement'
          系统参数__________path: 'system_parameter'
          系统日志__________path: 'system_journal'
            业务操作日志____path: 'system_journalOperation'
            系统运行日志____path: 'system_journalFunction'
  */ 
export default [
  // 登陆 首页 消息的路由
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login - 登录',
        hideInMenu: true
      },
      component: () => import('@/view/login/login.vue')
    },
    {
      path: '/',
      name: '_home',
      redirect: '/home',
      component: Main,
      meta: {
        hideInMenu: true,
        notCache: true
      },
      children: [
        {
          path: '/home',
          name: 'home',
          meta: {
            hideInMenu: true,
            title: '首页',
            notCache: true,
            icon: 'md-home'
          },
          component: () => import('@/view/single-page/home')
        }
      ]
    },
    {
      path: '/message',
      name: 'message',
      component: Main,
      meta: {
        hideInBread: true,
        hideInMenu: true
      },
      children: [
        {
          path: 'message_page',
          name: 'message_page',
          meta: {
            icon: 'md-notifications',
            title: '消息中心'
          },
          component: () => import('@/view/single-page/message/index.vue')
        }
      ]
    },
  // 登陆 首页 消息的路由 end
  // 工作台的路由
    {
      path: '/work',
      name: '工作台',
      meta: {
        icon: 'logo-buffer',
        title: '工作台'
      },
      component: Main,
        children: [
          {
            path: 'wor_shortcut',
            name: 'work_shortcut',
            meta: {
              icon: 'md-trending-up',
              title: '快捷方式'
            },
            component: () => import('@/view/components/count-to/count-to.vue')
          },
          {
            path: 'work_workbench',
            name: 'work_workbench',
            meta: {
              icon: 'ios-infinite',
              title: '工作台'
            },
            component: () => import('@/view/components/drag-list/drag-list.vue')
          },
          {
            path: 'work_Notice',
            name: 'work_Notice',
            meta: {
              icon: 'md-git-branch',
              title: '公告'
            },
            component: () => import('@/view/components/tree-table/index.vue')
          },
          {
            path: 'work_notice',
            name: 'work_notice',
            meta: {
              icon: 'md-crop',
              title: '通知'
            },
            component: () => import('@/view/components/cropper/cropper.vue')
          },
          {
            path: 'work_remind',
            name: 'work_remind',
            meta: {
              icon: 'md-grid',
              title: '提醒'
            },
            component: () => import('@/view/components/tables/tables.vue')
          }
        ]
    },
  // 工作台的路由 end
  // 市场营销中心的路由
    {
      path: '/marke',
      name: '市场营销中心',
      meta: {
        icon: 'logo-buffer',
        title: '市场营销中心'
      },
      component: Main,
        children: [
          {
            path: 'marke_competitor',
            name: 'marke_competitor',
            meta: {
              icon: 'md-trending-up',
              title: '竞争对手'
            },
            component: () => import('@/view/components/count-to/count-to.vue')
          },
          {
            path: 'marke_industry',
            name: 'marke_industry',
            meta: {
              icon: 'ios-infinite',
              title: '行业动态'
            },
            component: () => import('@/view/components/drag-list/drag-list.vue')
          },
          {
            path: 'marke_plan',
            name: 'marke_plan',
            meta: {
              icon: 'md-git-branch',
              title: '市场计划'
            },
            component: () => import('@/view/components/tree-table/index.vue')
          },
          {
            path: 'marke_programme',
            name: 'marke_programme',
            meta: {
              icon: 'md-crop',
              title: '市场方案'
            },
            component: () => import('@/view/components/cropper/cropper.vue')
          },
          {
            path: 'marke_activity',
            name: 'marke_activity',
            meta: {
              icon: 'md-grid',
              title: '市场活动'
            },
            component: () => import('@/view/components/tables/tables.vue')
          }
        ]
    },
  // 市场营销中心的路由 end
  // 销售中心的路由
    {
      path: '/sale',
      name: '销售中心',
      meta: {
        icon: 'md-cloud-upload',
        title: '销售中心'
      },
      component: Main,
      children: [
        {
          path: 'sale_clue',
          name: 'sale_clue',
          meta: {
            icon: 'ios-document',
            title: '线索管理'
          },
          component: () => import('@/view/update/update-table.vue')
        },
        {
          path: 'sale_customer',
          name: 'sale_customer',
          meta: {
            icon: 'md-clipboard',
            title: '客户管理'
          },
          component: () => import('@/view/update/update-paste.vue')
        },
        {
          path: 'sale_customerSea',
          name: 'sale_customerSea',
          meta: {
            icon: 'ios-document',
            title: '客户公海'
          },
          component: () => import('@/view/update/update-table.vue')
        },
        {
          path: 'sale_merchant',
          name: 'sale_merchant',
          meta: {
            icon: 'md-clipboard',
            title: '商机管理'
          },
          component: () => import('@/view/update/update-paste.vue')
        },
        {
          path: 'sale_order',
          name: 'sale_order',
          meta: {
            icon: 'md-clipboard',
            title: '订单管理'
          },
          component: () => import('@/view/update/update-paste.vue')
        }
      ]
    },
  // 销售中心的路由 end
  // 会员中心的路由
    {
      path: '/member',
      name: '会员中心',
      meta: {
        icon: 'ios-stats',
        title: '会员中心'
      },
      component: Main,
      children: [
        {
          path: 'member_studentFiles',
          name: 'member_studentFiles',
          meta: {
            icon: 'md-add',
            title: '学员档案'
          },
          component: () => import('@/view/excel/upload-excel.vue')
        },
        {
          path: 'member_admAss',
          name: 'member_admAss',
          meta: {
            icon: 'md-download',
            title: '入学评估'
          },
          component: () => import('@/view/excel/export-excel.vue')
        },
        {
          path: 'member_order',
          name: 'member_order',
          meta: {
            icon: 'md-add',
            title: '订单管理'
          },
          component: () => import('@/view/excel/upload-excel.vue')
        },
        {
          path: 'member_attendanceClass',
          name: 'member_attendanceClass',
          meta: {
            icon: 'md-download',
            title: '考勤销课'
          },
          component: () => import('@/view/excel/export-excel.vue')
        },
        {
          path: 'member_studentCourse',
          name: 'member_studentCourse',
          meta: {
            icon: 'md-download',
            title: '学员课程'
          },
          component: () => import('@/view/excel/export-excel.vue')
        },
        {
          path: 'member_studentRetreat',
          name: 'member_studentRetreat',
          meta: {
            icon: 'md-add',
            title: '学员退课'
          },
          component: () => import('@/view/excel/upload-excel.vue')
        },
        {
          path: 'member_studentRetreatHistory',
          name: 'member_studentRetreatHistory',
          meta: {
            icon: 'md-download',
            title: '学员退课历史'
          },
          component: () => import('@/view/excel/export-excel.vue')
        }
      ]
    },
  // 会员中心的路由 end
  // 教务中心的路由
    {
      path: '/edAd',
      name: '教务中心',
      meta: {
        icon: 'logo-buffer',
        title: '教务中心'
      },
      component: Main,
        children: [
          {
            path: 'edAd_course',
            name: 'edAd_course',
            meta: {
              icon: 'ios-infinite',
              title: '课程管理'
            },
            component: () => import('@/view/components/drag-list/drag-list.vue')
          },
          {
            path: 'edAd_courseCalendar',
            name: 'edAd_courseCalendar',
            meta: {
              icon: 'md-git-branch',
              title: '课程日历'
            },
            component: () => import('@/view/components/tree-table/index.vue')
          },
          {
            path: 'edAd_classroomCalendar',
            name: 'edAd_classroomCalendar',
            meta: {
              icon: 'md-crop',
              title: '教室日历'
            },
            component: () => import('@/view/components/cropper/cropper.vue')
          }
        ]
    },
  // 教务中心的路由 end
  // 门店管理的路由 
    {
      path: '/store',
      name: '门店管理',
      meta: {
        icon: 'logo-buffer',
        title: '门店管理'
      },
      component: Main,
        children: [
          {
            path: 'store_storeManagement',
            name: 'store_storeManagement',
            meta: {
              icon: 'md-trending-up',
              title: '门店管理'
            },
            component: () => import('@/view/components/count-to/count-to.vue')
          },
          {
            path: 'store_classroomManagement',
            name: 'store_classroomManagement',
            meta: {
              icon: 'ios-infinite',
              title: '教室管理'
            },
            component: () => import('@/view/components/drag-list/drag-list.vue')
          },
          {
            path: 'store_courseCalendar',
            name: 'store_courseCalendar',
            meta: {
              icon: 'md-git-branch',
              title: '课程日历'
            },
            component: () => import('@/view/components/tree-table/index.vue')
          },
          {
            path: 'store_classroomCalendar',
            name: 'store_classroomCalendar',
            meta: {
              icon: 'md-crop',
              title: '教室日历'
            },
            component: () => import('@/view/components/cropper/cropper.vue')
          }
        ]
    },
  // 门店管理的路由  end
  // 加盟商管理路由
    {
      path: '/franchisee',
      name: '加盟商管理',
      meta: {
        icon: 'logo-buffer',
        title: '加盟商管理'
      },
      component: Main,
        children: [
          {
            path: 'franchisee_information',
            name: 'franchisee_information',
            meta: {
              icon: 'md-trending-up',
              title: '基本信息'
            },
            component: () => import('@/view/components/franchisee/information.vue')
          },
          {
            path: 'franchisee_contacts',
            name: 'franchisee_contacts',
            meta: {
              icon: 'ios-infinite',
              title: '联系人'
            },
            component: () => import('@/view/components/franchisee/contacts.vue')
          },
          {
            path: 'franchisee_bargain',
            name: 'franchisee_bargain',
            meta: {
              icon: 'md-git-branch',
              title: '合同管理'
            },
            component: () => import('@/view/components/franchisee/bargain.vue')
          },
          {
            path: 'franchisee_opening',
            name: 'franchisee_opening',
            meta: {
              icon: 'md-crop',
              title: '开业管理'
            },
            component: () => import('@/view/components/franchisee/opening.vue')
          },
          {
            path: 'franchisee_default',
            name: 'franchisee_default',
            meta: {
              icon: 'md-trending-up',
              title: '违约管理'
            },
            component: () => import('@/view/components/franchisee/default.vue')
          },
          {
            path: 'franchisee_assess',
            name: 'franchisee_assess',
            meta: {
              icon: 'ios-infinite',
              title: '考核管理'
            },
            component: () => import('@/view/components/franchisee/assess.vue')
          },
          {
            path: 'franchisee_courseCalendar',
            name: 'franchisee_courseCalendar',
            meta: {
              icon: 'md-git-branch',
              title: '课程日历'
            },
            component: () => import('@/view/components/franchisee/courseCalendar.vue')
          },
          {
            path: 'franchisee_classroomCalendar',
            name: 'franchisee_classroomCalendar',
            meta: {
              icon: 'md-crop',
              title: '教室日历'
            },
            component: () => import('@/view/components/franchisee/classroomCalendar.vue')
          }
        ]
    },
  // 加盟商管理路由 end
  // 教师合伙人管理的路由
    {
      path: '/partner',
      name: '教师合伙人管理',
      meta: {
        icon: 'logo-buffer',
        title: '教师合伙人管理'
      },
      component: Main,
        children: [
          {
            path: 'partner_information',
            name: 'partner_information',
            meta: {
              icon: 'md-trending-up',
              title: '个人信息'
            },
            component: () => import('@/view/components/count-to/count-to.vue')
          },
          {
            path: 'partner',
            name: 'partner',
            meta: {
              icon: 'ios-infinite',
              title: '更多'
            },
            component: () => import('@/view/components/drag-list/drag-list.vue')
          }
        ]
    },
  // 教师合伙人管理的路由 end
  // 财务中心的路由
    {
      path: '/multilevel9',
      name: '财务中心',
      meta: {
        icon: 'md-menu',
        title: '财务中心'
      },
      component: Main,
      children: [
        {
          path: 'level_2_1',
          name: 'level_2_1',
          meta: {
            icon: 'md-funnel',
            title: '二级-1'
          },
          component: () => import('@/view/multilevel/level-2-1.vue')
        },
        {
          path: 'level_2_2',
          name: 'level_2_2',
          meta: {
            access: ['super_admin'],
            icon: 'md-funnel',
            showAlways: true,
            title: '二级-2'
          },
          component: parentView,
          children: [
            {
              path: 'level_2_2_1',
              name: 'level_2_2_1',
              meta: {
                icon: 'md-funnel',
                title: '三级'
              },
              component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
            },
            {
              path: 'level_2_2_2',
              name: 'level_2_2_2',
              meta: {
                icon: 'md-funnel',
                title: '三级'
              },
              component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
            }
          ]
        },
        {
          path: 'level_2_3',
          name: 'level_2_3',
          meta: {
            icon: 'md-funnel',
            title: '二级-3'
          },
          component: () => import('@/view/multilevel/level-2-3.vue')
        }
      ]
    },
  // 财务中心的路由 end
  // 服务中心的路由
    {
      path: '/serviceCentre',
      name: '服务中心',
      meta: {
        icon: 'logo-buffer',
        title: '服务中心'
      },
      component: Main,
        children: [
          {
            path: 'serviceCentre',
            name: 'serviceCentre',
            meta: {
              icon: 'md-trending-up',
              title: '服务中心'
            },
            component: () => import('@/view/components/count-to/count-to.vue')
          },
          {
            path: 'serviceCentre',
            name: 'serviceCentre',
            meta: {
              icon: 'ios-infinite',
              title: '更多'
            },
            component: () => import('@/view/components/drag-list/drag-list.vue')
          }
        ]
    },
  // 服务中心的路由 end
  // 业务分析的路由
    {
      path: '/business',
      name: '业务分析',
      meta: {
        icon: 'logo-buffer',
        title: '业务分析'
      },
      component: Main,
        children: [
          {
            path: 'business_sale',
            name: 'business_sale',
            meta: {
              icon: 'md-trending-up',
              title: '销售'
            },
            component: () => import('@/view/components/count-to/count-to.vue')
          },
          {
            path: 'business_marke',
            name: 'business_marke',
            meta: {
              icon: 'ios-infinite',
              title: '市场'
            },
            component: () => import('@/view/components/drag-list/drag-list.vue')
          },
          {
            path: 'business_finance',
            name: 'business_finance',
            meta: {
              icon: 'md-git-branch',
              title: '财务'
            },
            component: () => import('@/view/components/tree-table/index.vue')
          },
          {
            path: 'business_service',
            name: 'business_service',
            meta: {
              icon: 'md-crop',
              title: '服务'
            },
            component: () => import('@/view/components/cropper/cropper.vue')
          },
          {
            path: 'business_member',
            name: 'business_member',
            meta: {
              icon: 'md-grid',
              title: '会员'
            },
            component: () => import('@/view/components/tables/tables.vue')
          }
        ]
    },
  // 业务分析的路由 end
  // 应用设置的路由
    {
      path: '/apply',
      name: '应用设置',
      meta: {
        icon: 'logo-buffer',
        title: '应用设置'
      },
      component: Main,
        children: [
          {
            path: 'apply_data',
            name: 'apply_data',
            meta: {
              icon: 'md-trending-up',
              title: '基础数据字典'
            },
            component: () => import('@/view/components/count-to/count-to.vue')
          },
          {
            path: 'apply_business',
            name: 'apply_business',
            meta: {
              icon: 'ios-infinite',
              title: '业务品牌'
            },
            component: () => import('@/view/components/drag-list/drag-list.vue')
          },
          {
            path: 'apply_member',
            name: 'apply_member',
            meta: {
              icon: 'md-git-branch',
              title: '会员设置'
            },
            component: () => import('@/view/components/tree-table/index.vue')
          },
          {
            path: 'apply_marke',
            name: 'apply_marke',
            meta: {
              icon: 'md-crop',
              title: '市场设置'
            },
            component: () => import('@/view/components/cropper/cropper.vue')
          },
          {
            path: 'apply_league',
            name: 'apply_league',
            meta: {
              icon: 'md-grid',
              title: '加盟商业务设置'
            },
            component: () => import('@/view/components/tables/tables.vue')
          },
          {
            path: 'apply_partner',
            name: 'apply_partner',
            meta: {
              icon: 'md-crop',
              title: '教师合伙人业务设置'
            },
            component: () => import('@/view/components/cropper/cropper.vue')
          },
          {
            path: 'apply_trade',
            name: 'apply_trade',
            meta: {
              icon: 'md-grid',
              title: '交易设置'
            },
            component: () => import('@/view/components/tables/tables.vue')
          }
          ,
          {
            path: 'apply_PublicDictionary',
            name: 'apply_PublicDictionary',
            meta: {
              icon: 'md-grid',
              title: '公共字典'
            },
            component: () => import('@/view/components/apply/apply_PublicDictionary.vue')
          }
        ]
    },
  // 应用设置的路由 end
  // 系统设置的路由
  {
    path: '/system',
    name: '系统设置',
    meta: {
      icon: 'logo-buffer',
      title: '系统设置'
    },
    component: Main,
      children: [
        {
          path: 'system_business',
          name: 'system_business',
          meta: {
            icon: 'md-trending-up',
            title: '业务线设置'
          },
          component: () => import('@/view/components/system/business.vue')
        },
        {
          path: 'system_organization',
          name: 'system_organization',
          meta: {
            icon: 'ios-infinite',
            title: '组织结构'
          },
          component: () => import('@/view/components/system/organization.vue')
        },
        {
          path: 'system_position',
          name: 'system_position',
          meta: {
            icon: 'md-git-branch',
            title: '职位'
          },
          component: () => import('@/view/components/system/position.vue')
        },
        {
          path: 'system_role',
          name: 'system_role',
          meta: {
            icon: 'md-crop',
            title: '系统角色'
          },
          component: () => import('@/view/components/system/role.vue')
        },
        {
          path: 'system_PersonnelManagement',
          name: 'system_PersonnelManagement',
          meta: {
            icon: 'md-grid',
            title: '人员管理'
          },
          component: () => import('@/view/components/system/PersonnelManagement.vue')
        },
        {
          path: 'system_parameter',
          name: 'system_parameter',
          meta: {
            icon: 'md-crop',
            title: '系统参数'
          },
          component: () => import('@/view/components/system/parameter.vue')
        },
        {
          path: 'system_journal',
          name: 'system_journal',
          meta: {
            icon: 'md-grid',
            title: '系统日志'
          },
          component: () => import('@/view/components/system/journal.vue')
        }
      ]
  },
  // 系统设置的路由 end
  // 错误页面的路由
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
  // 错误页面的路由 end

]
